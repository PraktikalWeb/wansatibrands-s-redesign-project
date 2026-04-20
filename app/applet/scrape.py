import urllib.request
import re

urls = [
    "https://www.wansatibrands.co.za/shop/fashion/dresses/melania-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/prisha-sets/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/rhandzu-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/pfukani-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/dresses/rhulani-dress-pink-aqua-duchess-satin-luxury-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/inkosikazi-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/mahlohonolo-dress/?v=eacb463a8002",
    "https://www.wansatibrands.co.za/shop/fashion/african-print/cattleya-dress/?v=eacb463a8002"
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
        m = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if m:
            print(m.group(1))
        else:
            print("NO IMAGE")
    except Exception as e:
        print(e)
