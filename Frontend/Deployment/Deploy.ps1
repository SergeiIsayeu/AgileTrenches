#
# Deploy.ps1
#
# deploying this to the S3 bucket on the cloud
# setting permissions pn the bucket level after update
# 

$bucketName = 'trenches-dev.isayeu.com'


function UploadFileToS3([String] $filePath)
{
    Write-Host $filePath;


}

$filesToUpload = ('..\admin\index.html', '..\content\*.*', '..\data.json','..\favicon.ico', '..\index.html');
ForEach($mask in $filesToUpload)
{
	Write-Host $mask
    $filesByMask = Get-ChildItem $mask
    ForEach($file in $filesByMask)
    {
        
        UploadFileToS3($file);
    }
    Write-Host $item
}

$bucket = Get-S3Bucket -BucketName $bucketName -ProfileName DefaultProfile
Write-Host $bucket.BucketName
Write-Host $bucket.CreationDate



