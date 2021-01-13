const express = require('express');

express.response.error = require('./error');
express.response.success = require('./success');
