import React from "react";

export default ({getWeather}) => (
  <form onSubmit={getWeather}>
    <input type="text" name="city" placeholder="City"/>
    <input type="text" name="country" placeholder="Country"/>
    <button>Get Weather</button>
  </form>
);
