# MoneyTime

MoneyTime is a small experimental application that counts time and converts it to earned money based on the user's pay per hour. The app was created using Electron Fiddle.

![image](https://user-images.githubusercontent.com/88397927/226978099-7f46ad35-ee2e-4656-b1db-217c6a561f28.png)

## Installation

To use MoneyTime, you can download either the installer or the portable application from the [v1.0.0 release](https://github.com/roieeedouek/MoneyTime/releases/tag/v1.0.0) on GitHub.

### Installer

To use the installer, simply download the `money-time-1.0.0.Setup.exe` file and run it. The app will be installed to `C:\Users\<USER>\AppData\Local\MoneyTime`.

### Portable Application

To use the portable application, download the `MoneyTime.rar` file and extract it to the desired location on your system. Then, launch `money-time.exe` to start the app.

## Usage

To use MoneyTime, simply launch the application using the installation method of your choice. The app will open and display the current time and amount earned.

To modify the start time, double click on the displayed amount. To open the settings page, double click on the amount again.

![image](https://user-images.githubusercontent.com/88397927/226979015-f3d863e9-7e3d-4784-bbd2-e90f650c0c85.png)


## Settings

The settings page allows you to modify your pay settings and theme settings. To access this page, double click on the amount displayed in the main application window.

### Pay Settings
In the pay settings section, you can set your pay per hour and multiplier settings. These settings will be used to calculate the amount earned based on the time tracked.

![image](https://user-images.githubusercontent.com/88397927/226977966-56448992-5336-48a8-90a5-7f79decd98b8.png)

### Theme Settings
In the theme settings section, you can choose from several predefined themes or create your own custom theme. The app will update to reflect your chosen theme immediately.

![image](https://user-images.githubusercontent.com/88397927/226978381-754fcbc8-5991-4e24-9b6d-d379edca2752.png)

## Compilation
To compile MoneyTime, open the project with Electron Fiddle and use the tool to modify and launch. Alternatively, you can run the following command in the project directory:

```
npm install

electron-forge start
```

## License
This project is licensed under the MIT License.
