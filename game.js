if (!localStorage.getItem("has-visited")) {
  localStorage.setItem("has-visited", true);
  console.log("has not previously visited");
}
else {
  console.log("has previously visited");
}