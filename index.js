var fs = require("fs");
var Handlebars = require("handlebars");
var _ = require("lodash");
var moment = require("moment");

function dateToYearFormat(element) {
	element.startDate = moment(element.startDate, "YYYY-MM-DD").format("YYYY");

	if (!element.endDate) {
		element.endDate = "present"
	} else {
		element.endDate = moment(element.endDate, "YYYY-MM-DD").format("YYYY");
	}

	if (element.startDate === element.endDate) {
		element.endDate = '';
	}
}

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

	_.each(resume.work, function(work) {
		work = dateToYearFormat(work);
	});

	_.each(resume.volunteer, function(activity) {
		activity = dateToYearFormat(activity);
	});

	_.each(resume.education, function(education) {
		education = dateToYearFormat(education);
	});

	if (_.isEmpty(resume.references)) {
		resume.references = 'Available upon request';
	}

	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};
