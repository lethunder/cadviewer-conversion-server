# Installing CADViewer NodeJS Conversion Server

The CADViewer NodeJS Conversion server (nodejs/cadviewer-conversion-server/) is used in six different implementations: **NodeJS**, **Angular**,**ReactJS**, **Laravel**, **Rails7** and **VueJS**. 

The repository contains a full setup including converters and NodeJS controlling script


## This package contains

1: NodeJS script library for controlling CAD Conversions and communication with CADViewer  - in its preferred folder structure

2: AutoXchange AX2022 Converter and DWG Merge 2022 Converter - in their preferred folder structure

3: All structures for file-conversion, sample drawings, redlines, etc. 


## This package does not contain

4: The converter folder structure contains a larger set of fonts, installed in /cadviewer/converters/ax2022/windows/fonts/, but a fuller set of fonts can be installed. 

Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2022 TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).



## How to Use

1: Depending on the implementation, copy: CADViewer_config_XXXXXX.json -> **CADViewer_config.json** (where XXXXXX is either NodeJS, Angular, Laravel, ReactJS, Rails7 or VueJS), to set up a template server and path configuration prior to running the server. 

2: Ensure the port is set correctly in **CADViewer_config.json** , standard is 3000, but Rails/ runs on port 3000, so on that platform change to 4000 (or another suitable port)


3: The CAD converter [AutoXchange 2022](https://cadviewer.com/alldownloads/autoxchange), - and other converters -, needs to be installed and referenced through the configuration file. The converters typically is in the /nodejs/cadviewer-conversion-server/ folder structure, and the NodeJS download contains template folders in which to place the executables. 

4: This install includes the AutoXchange 2022 converter, but if needed, it can be updated from our [download](https://cadviewer.com/download) resources.

5: The [CADViewer](https://cadviewer.com/cadviewertechdocs) front-end can be found from our [download](https://cadviewer.com/download) resources, or installed directly from npm with: **npm i cadviewer**.


**NOTE:** Make sure the converter version number in CADViwer_config.json match the converters you install, and change any paths settings to correspond to your install folders.  

**Run:** the NodeJS server with:  *node CV_6.x.yy*



## General Documentation 

-   [CADViewer Techdocs and Installation Guide](https://cadviewer.com/cadviewertechdocs/download)



## Updating CAD Converters

This repository should contain the latest converters, but in case you need to update any of the back-end converters please follow: 

* [Download **AutoXchange**](/download/) (and other converters), install (unzip) AX2022 in **cadviewer/converters/ax2022/windows** or **cadviewer/converters/ax2022/linux** or in the designated folder structure.

* Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2020 TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).

* Try out the samples and build your own application!
 
 

