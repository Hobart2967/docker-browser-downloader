# Docker image for unpacking adb backups

Docker image pre-compiled for downloading files via browser. Useful for pulling resources behind CloudFront.
Based on playwright.

## Downloading resources using chrome/playwright

```sh
docker run --rm -v ./downloads:/downloads -it hobart2967/docker-brwoser-downloader https://source.url /downloads/my-resource.bin
```