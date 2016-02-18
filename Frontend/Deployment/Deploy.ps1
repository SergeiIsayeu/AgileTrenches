
$folder = (Get-Item -Path "..\" -Verbose).FullName
$bucketName = 'your-bucket-name-here'
Write-Host 'Current invocation path:', $folder
#Write-S3Object -BucketName 'staging.positivitymeter.com' -Folder (Get-Item -Path "..\" -Verbose).FullName -CannedACLName 'public-read' -ProfileName 'DefaultProfile' -KeyPrefix / -Recurse
Write-S3Object -BucketName $bucketName -Folder (Get-Item -Path "..\" -Verbose).FullName -CannedACLName 'public-read' -ProfileName 'DefaultProfile' -KeyPrefix / -Recurse

