import app from "./utils/app";

app.listen(process.env.PORT || 8004, () => {
  console.log(`Server started on http://localhost:${process.env.PORT || 8004}`);
});
