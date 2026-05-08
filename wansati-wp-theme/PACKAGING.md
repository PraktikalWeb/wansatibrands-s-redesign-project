# Packaging Instructions

## Zip Structure
The zip must contain the `wansati-wp-theme/` folder at its root.

Correct:

`wansati-wp-theme.zip`
`└── wansati-wp-theme/`

Incorrect:

`wansati-wp-theme.zip`
`└── assets/`
`└── functions.php`

## What to Include
- All files inside `wansati-wp-theme/`

## What Not to Include
- The React app root or any `src/` files outside the theme
- Local machine metadata such as `.DS_Store`
- Temporary logs, backups, or debug files
- The parent project folder

## Recommended Zip Command
Run this from the project root:

```bash
zip -r wansati-wp-theme.zip wansati-wp-theme -x "wansati-wp-theme/.DS_Store" "wansati-wp-theme/__MACOSX/*"
```

## Upload via WordPress Admin
1. Go to `Appearance > Themes`.
2. Click `Add New`.
3. Click `Upload Theme`.
4. Upload `wansati-wp-theme.zip`.
5. Install and activate on staging only.

## Upload via cPanel / File Manager
1. Upload `wansati-wp-theme.zip` to `wp-content/themes/`.
2. Extract the archive.
3. Confirm the final folder path is `wp-content/themes/wansati-wp-theme/`.
4. Activate the theme from `Appearance > Themes`.

## Safe Rollback
If activation fails:
1. Re-activate the previous working theme from `Appearance > Themes` if the admin stays accessible.
2. If the admin is inaccessible, rename `wansati-wp-theme/` via file manager or hosting panel.
3. Restore the previous theme folder name if needed.
4. Check PHP error logs and fix the issue on staging before another activation attempt.

## Activation Order Recommendation
1. Install WordPress.
2. Install WooCommerce.
3. Install payment, analytics, discount, and support plugins.
4. Import representative content and settings.
5. Upload and activate the theme.
6. Run the staging checklist before any production rollout.
