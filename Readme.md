##Info

```
cd /home/eze/git/ciqa && ./node_modules/@angular/cli/bin/ng build --prod && cp ./.htaccess dist/ && rsync --progress -ah src/i18n/. dist/i18n/ && rsync --progress -ah backend/. dist/backend/ && ciqapassword && rsync --progress -ahe ssh dist/. ciqaadmin@172.16.10.50:/var/www/html/
```
