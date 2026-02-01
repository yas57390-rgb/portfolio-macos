
const fs = require('fs');
try {
    const text = fs.readFileSync('profile_card_demo.js', 'utf8');

    // Find URL-like strings
    const urlMatches = text.match(/["'](https?:\/\/[^"']+\.(png|jpg|jpeg|webp|svg))["']/g);
    if (urlMatches) {
        console.log('Found full URLs:');
        urlMatches.forEach(m => console.log(m));
    }

    // Find relative assets
    const assetMatches = text.match(/["'](\/assets\/[^"']+)["']/g);
    if (assetMatches) {
        console.log('Found relative assets:');
        assetMatches.forEach(m => console.log(m));
    }

    // Find grainUrl specifically
    const grainMatch = text.match(/grainUrl\s*:\s*["']([^"']+)["']/);
    if (grainMatch) {
        console.log('Found grainUrl prop:', grainMatch[1]);
    }

    // Print context around "grain"
    const idx = text.indexOf('grain');
    if (idx !== -1) {
        console.log('Context around "grain":');
        console.log(text.substring(math.max(0, idx - 50), Math.min(text.length, idx + 100)));
    }

} catch (err) {
    console.error(err);
}
