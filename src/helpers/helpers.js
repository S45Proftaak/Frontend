export function getCurrentWeek() {
  //var d = new Date(
  //  Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  //);
  //var dayNum = d.getUTCDay() || 7;
  //d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  //var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0.1));
  //return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let week = Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  //console.log(week);
  return week;
}
