var Global = require('../models/global');
var Department = require('../models/department');
var TeamAuth = require('../models/teamAuth');
var TeamApply = require('../models/teamApply');

exports.applyGet = function (req, res) {
  var year = parseInt(req.params.year);
  if (year != 2014) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  Department.getAll(function(err, departments) {
    if (err) {
      req.flash('warning', err.toString());
      return res.redirect('/');
    }
    res.render('teamApply.jade', {
      name: 'team',
      user: req.session.user,
      flash: req.flash(),
      departments: departments,
      year: year,
    });
  });
};

exports.applyDepGet = function (req, res) {
  var year = parseInt(req.params.year);
  if (year != 2014) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  var dep = parseInt(req.params.dep);
  if (!(1 <= dep && dep <= Global.maxDepartmentid)) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  TeamAuth.get(year, dep, req.session.user, function(err, auth) {
    if (err) {
      req.flash('warning', err.toString());
      return res.redirect('/');
    }
    if (auth == false) {
      req.flash('warning', '抱歉，您没有权限查看');
      return res.redirect('..');
    }
    TeamApply.get(year, dep, function(err, results) {
      if (err) {
        req.flash('warning', err.toString());
        return res.redirect('/');
      }
      res.render('teamApplyList.jade', {
        name: 'team',
        user: req.session.user,
        flash: req.flash(),
        year: year,
        dep: dep,
        results: results,
      });
    });
  });
};

exports.applyDepIdGet = function (req, res) {
  var year = parseInt(req.params.year);
  if (year != 2014) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  var dep = parseInt(req.params.dep);
  if (!(1 <= dep && dep <= Global.maxDepartmentid)) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  var id = parseInt(req.params.id);
  if (!(11 <= id && id <= 16 || 21 <= id && id <= 26 || id == 31)) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  TeamAuth.get(year, dep, req.session.user, function(err, auth) {
    if (err) {
      req.flash('warning', err.toString());
      return res.redirect('/');
    }
    if (auth == false) {
      req.flash('warning', '抱歉，您没有权限查看');
      return res.redirect('..');
    }
    TeamApply.get(year, dep, function(err, results) {
      if (err) {
        req.flash('warning', err.toString());
        return res.redirect('/');
      }
      res.render('teamApplyId.jade', {
        name: 'team',
        user: req.session.user,
        flash: req.flash(),
        year: year,
        dep: dep,
        id: id,
        results: results,
      });
    });
  });
};

exports.applyDepIdPost = function (req, res) {
  var year = parseInt(req.params.year);
  if (year != 2014) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  var dep = parseInt(req.params.dep);
  if (!(1 <= dep && dep <= Global.maxDepartmentid)) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  var id = parseInt(req.params.id);
  if (!(11 <= id && id <= 16 || 21 <= id && id <= 26 || id == 31)) {
    req.flash('warning', 'URL错误');
    return res.redirect('/');
  }
  TeamAuth.get(year, dep, req.session.user, function(err, auth) {
    if (err) {
      req.flash('warning', err.toString());
      return res.redirect('/');
    }
    if (auth == false) {
      req.flash('warning', '抱歉，您没有权限查看');
      return res.redirect('..');
    }
    TeamApply.save(year, dep, id, req.body, function(err, results) {
      if (err) {
        req.flash('warning', '修改失败： ' + err.toString());
        return res.redirect('..');
      } else {
        req.flash('info', '修改成功');
        return res.redirect('..');
      }
    });
  });
};
