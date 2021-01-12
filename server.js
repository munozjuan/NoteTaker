// Set up requirements
const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");

// Set up reading and writing files
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

