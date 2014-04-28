# Nothing fancy here, just needed a quick script to copy all the files referenced in a M3U file to
# another drive (i.e. a music player, phone, external drive)

import sys, os
from shutil import copyfile

m3u_symbols = ["#EXTM3U", "#EXTINF"]

def load_playlist(filename):
    return [line.strip() 
            for line in open(filename, encoding='utf-8') 
            if not any(sym in line for sym in m3u_symbols)]

def copy_playlist(filelist, destination):
    for f in filelist:
        fpath, fname = os.path.split(f)
        copyfile(f, os.path.join(destination, fname))


if __name__ == '__main__':
    args = sys.argv
    if len(args) < 3:
        print("Usage: python playlist_copy.py <filename> <destination>")
        exit()

    filename = args[1]
    destination = args[2]
    ext = os.path.splitext(args[1])[1]

    if not os.path.exists(filename) or ext != ".m3u":
        print("Error: filename must be a valid M3U playlist")
        exit(1)
    if not os.path.exists(destination) or not os.path.isdir(destination):
        print("Error: destination must be a directory and must exist")
        exit(1)
    
    files_to_copy = load_playlist(filename)
    copy_playlist(files_to_copy, destination)