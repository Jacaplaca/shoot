import React from "react";
import ReactDOM from "react-dom";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { shallow } from "enzyme";
import App from "./App";
// import localStorage from "./localStorage";

Enzyme.configure({ adapter: new Adapter() });
// window.localStorage = localStorage;

const app = shallow(<App />);
// const tokenKey = "jwtToken";
// const tokenValue =
// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMWI4YzFiMGNjZTdiMmY2MDIzMzJhYyIsIm5hbWUiOiJhYWEiLCJyb2xhIjoiYWRtaW4iLCJpYXQiOjE1NDc4MDk4OTgsImV4cCI6MTU1MDQwMTg5OH0.k3jObuPvEFu9MJm5nx06qOoN2gBigCyn6r9tjFUKR6I";

// describe("localStorage", () => {
//   beforeEach(() => localStorage.clear());
//
//   it("is initialized properly", () => expect(localStorage.store).toEqual({}));
//
//   it("returns undefined if requested item doesn't exist", () => {
//     const foo = localStorage.getItem(tokenKey);
//     expect(foo).toBeUndefined();
//   });
//
//   it("sets the value of an item", () => {
//     localStorage.setItem(tokenKey, tokenValue);
//     expect(localStorage.store).toEqual({ [tokenKey]: tokenValue });
//   });
//
//   it("gets the value of an item", () => {
//     localStorage.setItem(tokenKey, tokenValue);
//     const foo = localStorage.getItem(tokenKey);
//     expect(foo).toBe(tokenValue);
//   });
//
//   // it("removes an item", () => {
//   //   localStorage.setItem("foo", "bar");
//   //   localStorage.removeItem("foo");
//   //   const foo = localStorage.getItem("foo");
//   //   expect(foo).toBeUndefined();
//   // });
//   //
//   // it("clears all items", () => {
//   //   localStorage.setItem("foo", "qwerty");
//   //   localStorage.setItem("bar", "asdf");
//   //   expect(localStorage.store).toEqual({ foo: "qwerty", bar: "asdf" });
//   //   localStorage.clear();
//   //   expect(localStorage.store).toEqual({});
//   // });
// });

it("renders correctly", async () => {
  console.log("renders");
  await expect(app).toMatchSnapshot();
});

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
