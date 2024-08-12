export default function extractHtmlToJpeg(str) {
    const regex = /https.*?\.(jpeg|jpg|png)/i;
    const match = str.match(regex);
    return match ? match[0] : null;
}