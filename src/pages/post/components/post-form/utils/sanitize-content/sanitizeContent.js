export function sanitizeContent(content) {
  return content
    .replaceAll("&nbsp;", " ")
    .replaceAll("<div><br></div>", "\n \n")
    .replaceAll("<div>", "")
    .replaceAll("</div>", "")
    .replaceAll("<br>", "\n")
    .replaceAll(";", "")
}
