const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||5000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

let students=[
 {id:1,name:"Karthik Raj",regNo:"24CSE101",room:"A-101",year:"2nd Year",status:"Active"},
 {id:2,name:"Priya Sharma",regNo:"24CSE112",room:"B-204",year:"2nd Year",status:"Active"},
 {id:3,name:"Rahul Kumar",regNo:"25CSE056",room:"A-102",year:"1st Year",status:"Active"}
];

let complaints=[
 {id:1,student:"Karthik Raj",category:"Maintenance",message:"Room fan needs repair",status:"Open"},
 {id:2,student:"Priya Sharma",category:"Food",message:"Dinner menu suggestion",status:"Resolved"}
];

let notices=[
 {id:1,title:"Hostel Meeting",date:"2026-10-10",description:"Monthly hostel meeting at 5:00 PM"},
 {id:2,title:"Mess Timings",date:"2026-10-12",description:"Updated mess timings will be displayed on notice board"}
];

app.get("/api/dashboard",(req,res)=>{
 res.json({
  students:students.length,
  occupiedRooms:students.length,
  openComplaints:complaints.filter(c=>c.status==="Open").length,
  notices:notices.length
 });
});

app.get("/api/students",(req,res)=>res.json(students));

app.post("/api/students",(req,res)=>{
 const {name,regNo,room,year}=req.body;
 if(!name||!regNo||!room||!year)return res.status(400).json({error:"All fields are required"});
 const student={id:Date.now(),name,regNo,room,year,status:"Active"};
 students.push(student);
 res.status(201).json(student);
});

app.delete("/api/students/:id",(req,res)=>{
 students=students.filter(s=>s.id!==Number(req.params.id));
 res.json({success:true});
});

app.get("/api/complaints",(req,res)=>res.json(complaints));

app.post("/api/complaints",(req,res)=>{
 const {student,category,message}=req.body;
 if(!student||!category||!message)return res.status(400).json({error:"All fields are required"});
 const complaint={id:Date.now(),student,category,message,status:"Open"};
 complaints.push(complaint);
 res.status(201).json(complaint);
});

app.patch("/api/complaints/:id",(req,res)=>{
 const c=complaints.find(x=>x.id===Number(req.params.id));
 if(!c)return res.status(404).json({error:"Complaint not found"});
 c.status=c.status==="Open"?"Resolved":"Open";
 res.json(c);
});

app.get("/api/notices",(req,res)=>res.json(notices));

app.post("/api/notices",(req,res)=>{
 const {title,date,description}=req.body;
 if(!title||!date||!description)return res.status(400).json({error:"All fields are required"});
 const notice={id:Date.now(),title,date,description};
 notices.push(notice);
 res.status(201).json(notice);
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));

app.listen(PORT,()=>console.log(`Hostel Management System running on http://localhost:${PORT}`));