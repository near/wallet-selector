const fs = require('fs').promises;
const path = require('path');

const packagesDirectory = path.join(__dirname, '../dist/packages');
const rootPackageJsonPath = path.join(__dirname, '../package.json');

// Replace double backslashes with forward slashes in a path
const fixPath = path => path.replace(/\\/g, '/').replace(/\/\//g, '/');

// Load root package.json to get original dependency versions with caret prefixes
let rootDependencies = {};
async function loadRootDependencies() {
  try {
    const rootPackageContent = await fs.readFile(rootPackageJsonPath, 'utf8');
    const rootPackage = JSON.parse(rootPackageContent);
    rootDependencies = { ...rootPackage.dependencies, ...rootPackage.devDependencies };
  } catch (error) {
    console.error('Error loading root package.json:', error);
  }
}

// Update types field and fix dependency versions in package.json
async function updatePackageJSON(packageName) {
  const packagePath = path.join(packagesDirectory, packageName);
  const packageJsonPath = path.join(packagePath, 'package.json');

  try {
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    let updated = false;

    // Fix types field path
    if (packageJson.types) {
      packageJson.types = fixPath(packageJson.types);
      updated = true;
    }

    // Fix dependency versions to use caret ranges from root package.json
    if (packageJson.dependencies) {
      for (const [depName, depVersion] of Object.entries(packageJson.dependencies)) {
        // Skip internal workspace dependencies
        if (depName.startsWith('@near-wallet-selector/')) {
          continue;
        }

        // If this dependency exists in root with a caret, use that version
        if (rootDependencies[depName] && rootDependencies[depName].startsWith('^')) {
          packageJson.dependencies[depName] = rootDependencies[depName];
          updated = true;
        } else if (rootDependencies[depName] && !depVersion.startsWith('^') && !depVersion.startsWith('~')) {
          // If root has exact version but we want to add caret for semver compatibility
          packageJson.dependencies[depName] = `^${depVersion}`;
          updated = true;
        } else if (!rootDependencies[depName] && !depVersion.startsWith('^') && !depVersion.startsWith('~')) {
          // If dependency is not in root but is exact version, add caret for semver compatibility
          packageJson.dependencies[depName] = `^${depVersion}`;
          updated = true;
        }
      }
    }

    if (updated) {
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`Updated package.json for ${packageName}`);
    }
  } catch (error) {
    console.error(`Error updating package.json for ${packageName}:`, error);
  }
}

// Update all packages
async function updateAllPackages() {
  try {
    // Load root dependencies first
    await loadRootDependencies();

    const packageNames = await fs.readdir(packagesDirectory);

    for (const packageName of packageNames) {
      await updatePackageJSON(packageName);
    }
    console.log(`Successfully updated package.json for all packages`);

  } catch (error) {
    console.error('Error reading packages directory:', error);
  }
}

updateAllPackages();
