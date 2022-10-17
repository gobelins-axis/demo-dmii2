# Starter prototype

Starter for creating web prototypes quickly.

## Getting started

### Creating your own repository and use this starter

#### Using github template feature

1. Create your own repository for your prototype through the github interface.
2. Name it correctly, example: **prototype-my-project-name**.
3. Select **starter-prototype** in the template dropdown.
4. Edit the README file according to the project. (Think about removing the whole "Creating your own repository and use this starter" part).
5. You can now start working on your project repository.

#### Using git commands

1. Create your own repository for your prototype through the github interface.
2. Name it correctly, example: **prototype-my-project-name**.
3. Clone this starter repository with your repository name:
```bash
git clone git@github.com:cosmicshelter/starter-prototype.git prototype-my-project-name
```
4. Go to your project folder, reset the git history and set the remote url with your prototype repository remote url:
```bash
cd prototype-my-project-name
rm -rf .git
git init
git branch -M main
git remote add origin git@github.com:cosmicshelter/prototype-my-project-name.git
git add .
git commit -m ":tada: First commit"
git push -u origin main
```
4. Edit the README file according to the project. (Think about removing the whole "Creating your own repository and use this starter" part).
5. You can now start working on your project repository.

### Setup the correct node version

```bash
nvm use
```

### Install dependencies

```bash
pnpm install
```

### Start working

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

## Use static assets

Static assets should be place in the /public folder.

## WebGL

### Scenes

In **@/src/script/webgl/scenes** you'll find a template scene folder, you can copy paste this folder and rename it with your scene name. You should also rename the class and config name property.

Then in **@/src/script/webgl/scenes/index.js**, import your scene and add it to the exported object : 

```js
import SceneSample from './SceneSample';
import SceneYourSceneName from './SceneYourSceneName';

export default {
    // Main Scene
    'main': SceneSample,
    // Scenes
    'Sample': SceneSample,
    'YourSceneName': SceneYourSceneName
};
```

Now that this is done, you can visualize your scene using the scene query url and the name of your scene : **localhost:5174/?scene=YourSceneName**

### Cameras

In **@/src/script/webgl/modules** you'll find a CameraManager class, it's useful to enable/disable different types of cameras when working on a scene.

For example you might need an orbit control camera but also a default one for you scene... 

The camera settings, position, rotation are saved in the localstorage, it's useful to speedup development processes. When you want to go back to the default settings just click the reset button.
