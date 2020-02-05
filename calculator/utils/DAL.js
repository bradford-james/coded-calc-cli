const ds = require("../data/dataStore");

const getCmdDAL = inputCode => {
  const cmdObj = ds.commands.find(obj => obj.code === inputCode);
  return cmdObj;
};

const getErrorDAL = errCode => {
  const errObj = ds.errors.find(obj => obj.code === errCode);
  return errObj.message;
};

exports.getCmdDAL = getCmdDAL;
exports.getErrorDAL = getErrorDAL;
