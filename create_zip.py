import os
import zipfile

zip_name = "bwb_4_0_submission.zip"
with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        for file in files:
            if not file.endswith('.zip') and not file.startswith('.'):
                zipf.write(os.path.join(root, file))

print("ZIP File Ready!")