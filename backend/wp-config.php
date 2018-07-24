<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'ciqabackend');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'ciqa!MySql$');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '=wr6QyFH_9*vgs}Q`-6nh$#p`3)?0yDXJm~~@w<V3)Xgv.X$M3m=l}fe1n]2syWs');
define('SECURE_AUTH_KEY',  'KWj/{e:|4y<71*jwQLjCnF:9T.C$O;.L/hZG7woq#%]@Yveyc5E@NAr3x-SK3C+9');
define('LOGGED_IN_KEY',    '.:|.5a>P4w /T dgHyJPl^>HXW ]87:P5/^`,~)z}*kp3200Z2s+:7xD/z^kY(hG');
define('NONCE_KEY',        'Sz4;3xu9K`zfr.ih^iiyOv}xB{J5W!LN5G+$aHUUV^O_]x<zE,~rqaFL>]Vnx*VG');
define('AUTH_SALT',        'KkoBSx1Pu1-#^!j,<LsGuXOM]tkm+x_Hpz:a5vn<$Xo[k_&bYE;K 3X>tw%/@sFj');
define('SECURE_AUTH_SALT', '0$,ayb*eTyCz-Voy;>MEknUiK0:ZIX}wW[t:U`e4evGorfJ&%+^:tRxFw1mI~~ l');
define('LOGGED_IN_SALT',   '%o3}QA(K6=N(/w&%gWgaz$oM%UhP3tyM:#d,tc~z=M-v2Ga/prT<c6b:&y=`UUSc');
define('NONCE_SALT',       'I-cZ4qhtzk)[l]LHpghm[CU-sz#.2S8.x%Mk #ayx?xx:5@R`+p+cjj/}Z|aOLPQ');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
