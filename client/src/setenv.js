const env = process.env.NODE_ENV;
console.log("jestm w env", process.env);
if (env === "production") {
  console.log(`HOST=${process.env.HOST}`);
} else {
  console.log(`HOST=http://localhost:8000`);
}
