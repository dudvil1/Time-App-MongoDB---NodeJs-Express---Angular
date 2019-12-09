const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewere/check-auth");
const moment = require("moment");
const mongoose = require("mongoose");
const User = require("../../models/user");
const logic = require("../../service/logic");

router.patch("/startShift", async (req, res, next) => {
  try {
    console.log("req:", req.body);
    let user = await User.findOne({ userId: req.body.user.userId });
    let currentTime = new Date(req.body.time);
    console.log(user);
    user.times.map(time => {
      if (currentTime.toISOString().split("T")[0] === time.date) {
        if (time.exitTime === "didnt finish the shift yet") {
          return res.status(401).json({
            message: "didnt finish the shift yet"
          });
        }
      }
    });

    user.times.push({
      _id: new mongoose.Types.ObjectId(),
      date: currentTime.toISOString().split("T")[0],
      enteryTime:
        currentTime.getHours() +
        ":" +
        currentTime.getMinutes() +
        ":" +
        currentTime.getSeconds(),
      exitTime: "didnt finish the shift yet",
      location: {
        latitude: req.body.location.lat,
        longitude: req.body.location.lng
      },
      note: req.body.note
    });
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Shift created",
      shift: user.times[user.times.length - 1],
      userShifts: {
        shifts: user.times
      },
      user: user
    });
  } catch (error) {
    res.status(400).json({ status: "faild", message: error.message });
  }
});

router.patch("/exitShift", async (req, res, next) => {
  try {
    console.log(req.body);
    let currentTime = new Date(req.body.time);
    let user = await User.findOne({ userId: req.body.user.userId });
    let usersave;

    for (let i = 0; i < user.times.length; i++) {
      if (currentTime.toISOString().split("T")[0] === user.times[i].date) {
        console.log("find shift in the right date");
        if (user.times[i].exitTime === "didnt finish the shift yet") {
          console.log("before update");
          console.log(user.times[i]._id);
          usersave = await User.update(
            { userId: req.body.user.userId, "times._id": user.times[i]._id },
            {
              $set: {
                "times.$.exitTime":
                  currentTime.getHours() +
                  ":" +
                  currentTime.getMinutes() +
                  ":" +
                  currentTime.getSeconds()
              }
            }
          );
          console.log(usersave);
          return res.status(200).json({
            message: "update exit , see you"
          });
        } else {
          res.status(409).json({
            message: "did not start your shift yet"
          });
        }
      }
    }
    res.status(409).json({
      message: "did not start your shift yet"
    });
  } catch (error) {
    res.status(400).json({ status: "faild", message: error.message });
  }
});

router.get("/getMyShifts", checkAuth, async (req, res, next) => {
  try {
    console.log(req.query.time);
    let user = await User.findById(req.query.user).exec();
    let Usershifts = await User.aggregate([
      { $unwind: "$times" },
      {
        $project: {
          month: {
            $month: { $dateFromString: { dateString: "$times.date" } }
          },
          year: {
            $year: { $dateFromString: { dateString: "$times.date" } }
          },
          time: "$times"
        }
      },
      {
        $match: { month: req.query.time, year: req.body.time }
      }
    ]);
    console.log("userShifts",Usershifts);
    
    return res.status(200).json({
      message: "ok",
      shifts: user.times 
    });
  } catch (error) {
    res.status(400).json({ status: "faild", message: error.message });
  }
});

module.exports = router;
