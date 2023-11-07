const fs = require('fs').promises;
const path = require('path');

const packagesDirectory = path.join(__dirname, '../dist/packages');

// Replace double backslashes with forward slashes in a path
const fixPath = path => path.replace(/\\/g, '/').replace(/\/\//g, '/');

// Update types field in package.json
async function updatePackageJSONTypeField(packageName) {
  const packagePath = path.join(packagesDirectory, packageName);
  const packageJsonPath = path.join(packagePath, 'package.json');

  try {
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    if (packageJson.types) {
      packageJson.types = fixPath(packageJson.types);
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    } else {
      console.log(`No 'types' field found in package.json for ${packageName}`);
    }
  } catch (error) {
    console.error(`Error updating package.json for ${packageName}:`, error);
  }
}

// Update all packages
async function updateAllPackagesTypeField() {
  try {
    const packageNames = await fs.readdir(packagesDirectory);

    for (const packageName of packageNames) {
      await updatePackageJSONTypeField(packageName);
    }
    console.log(`Successfully updated types path in package.json for all packages`);

  } catch (error) {
    console.error('Error reading packages directory:', error);
  }
}

updateAllPackagesTypeField();
