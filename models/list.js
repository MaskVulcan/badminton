var conn = require('./db');
var Authority = require('./authority');

exports.getAll = function (numberL, numberR, callback) {
  conn().query("select user.studentid,user.name,\
  CASE WHEN sex = 'm' THEN '男' ELSE '女' END AS sex,\
  department.name as department,email,phone\
  from user,department,authority\
  where user.departmentid = department.id\
  and user.studentid = authority.studentid\
  and user.studentid > 1000000010\
  and ? <= authority.rank and authority.rank <= ?\
  order by sex desc, user.studentid", [numberL, numberR], function(err, results) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, results);
    }
  });
};

exports.getAuthority = function (studentid, callback) {
  if (studentid == null) {
    return callback(null, false);
  }
  Authority.get(studentid, function(err, authority) {
    if (err) {
      return callback(err, false);
    }
    if (authority.length == 0) {
      return callback(null, false);
    }
    if (authority[0].rank == 3) {
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  });
};

