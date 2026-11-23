#!/bin/sh
# Her yayında sitenin sürüm numarasını ve tarihini günceller (git pre-commit kancası olarak çalışır).
# Sürüm: ANA.SIRA. ANA büyük yenilemedir (1: test döneminden sonra 23 Kasım 2026'daki kamuya açık sürüm);
# SIRA, o yenilemeden bu yana yapılan güncellemelerin sayısıdır (her yayında bir artar).
set -e
cd "$(git rev-parse --show-toplevel)"
# Bir önceki sürüm numarası js/surum.js'ten okunur ve ikinci sayı bir artırılır
ONCEKI=$(sed -nE 's/.*surum: "([0-9]+)\.([0-9]+)".*/\1 \2/p' js/surum.js)
ANA=${ONCEKI% *}; SIRA=${ONCEKI#* }
[ -n "$ANA" ] || { ANA=1; SIRA=0; }
SURUM="$ANA.$((SIRA + 1))"
TARIH=$(TZ=Europe/Istanbul date +%Y-%m-%dT%H:%M:%S%z | sed -E 's/([0-9]{2})$/:\1/')
printf '// Bu dosya her yayında otomatik güncellenir (araclar/surum-guncelle.sh).\n// Sürüm: büyük yenileme . o yenilemeden sonraki güncelleme sırası\nwindow.SITE_SURUM = { surum: "%s", tarih: "%s" };\n' "$SURUM" "$TARIH" > js/surum.js
for f in *.html; do
  [ -f "$f" ] && sed -i -E "s#js/surum\.js(\?v=[0-9.]+)?#js/surum.js?v=$SURUM#" "$f"
done
git add js/surum.js
git add -u -- '*.html'
