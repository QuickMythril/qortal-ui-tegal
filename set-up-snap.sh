#!/bin/sh

# Qortal Blockchain Project - 2020

# Script to install and setup snapstore

set -ev

setup_snap()
{
  echo -e '---INSTALLING SNAPCRAFT!---'

  sudo snap install snapcraft --classic

  echo -e 'LOGIN TO SNAP'
  echo $SNAP_TOKEN | snapcraft login --with -
  


}

setup_snap