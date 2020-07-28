import React, { Component } from "react";

export default () => {
  return (
    <div class="compete">
      <div class="item">
        <div class="title">
          <i class="fas fa-stopwatch"></i>
          <h2>Get selected square quickest</h2>
        </div>
        <div class="options">
          <div class="option opt1">
            2048
            <span class="desc">Easy</span>
          </div>
          <div class="option opt2">
            4096
            <span class="desc">Medium</span>
          </div>
          <div class="option opt3">
            8192
            <span class="desc">Hard</span>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="title">
          <i class="fas fa-trophy"></i>
          <h2>Get the highest score</h2>
        </div>
        <div class="options">
          <div class="option opt4">
            5x5
            <span class="desc">Easy Grid</span>
          </div>
          <div class="option opt5">
            4x4
            <span class="desc">Normal Grid</span>
          </div>
          <div class="option opt6">
            3x3
            <span class="desc">Hard Grid</span>
          </div>
        </div>
      </div>
    </div>
  );
};
