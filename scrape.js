import https from 'https';

const urls = [
    "https://www.wansatibrands.co.za/shop/fashion/dresses/melania-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/prisha-sets/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/rhandzu-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/pfukani-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/dresses/rhulani-dress-pink-aqua-duchess-satin-luxury-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/inkosikazi-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/mahlohonolo-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/cattleya-dress/?v=eacb463a8002"
];

const fetchHtml = (url) => new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
    }).on('error', reject);
});

async function run() {
    for (const url of urls) {
        try {
            const html = await fetchHtml(url);
            const match = html.match(/<meta property="og:image" content="([^"]+)"/);
            if (match) {
                console.log(match[1]);
            } else {
                console.log("NO IMAGE");
            }
        } catch (e) {
            console.error(e);
        }
    }
}
run();
