# Curiosity report
## Main topic
I decided to delve more into what exactly Docker is, as I use it for a lot of different applications outside of this class and take for granted how convenient it is to spin up and use these containers. I am going into this with the following questions:
- what exactly is a "container"
- how is is different from a VM
- why is it so much faster than a VM
- what are docker's limitations when compared to a VM
## Questions and answers
### What Exactly is a "Container"
- A container, in the most general sense, is something that abstracts away system calls to make it easier for developers to develop with it. This can also apply to the user, as it makes it much easier for the user to interact with the system, also.
- There are quite a few container standards out there, but the most common one and the one that Docker uses is called "containerd".
### What is containerd?
- Containerd is the fully abstracted and "low level" version of a container. It sits at the base and is what handles all of the different system calls.
- This container type is used in things like Docker. It is also used generally everywhere in Linux. "Systemd," a very heavily used system monitoring and event running application, is built inside of containerd. This makes it much more modular than what it would be otherwise. This modularity makes it both much easier to develop on for Linux developers, but also much more simple to use for end users like me.
### What is Systemd?
- "systemd is a software suite that provides an array of system components for Linux[7] operating systems. The main aim is to unify service configuration and behavior across Linux distributions." - [Wikipedia](https://en.wikipedia.org/wiki/Systemd)
- Most linux systems use this software because of the flexibility it has and due to how lightweight it is. It was made to replace older legacy systems that didn't have nearly as clean implementations for developers and users.
### Why bring this all up?
- This is all here to show that even at the base of Linux, everything just makes more sense as a container. They are fast and easy to use mini environments that make the life of developers and users alike much easier.
### How is a Container Different From a VM?
- A VM is a full re-creation of the layers of a computer and an operating system.
- The system calls have been virtualized to the hardware. This is to say that the VM somewhat directly interacts with the hardware, making its own calls as it needs it.
- As such, VMs are much closer to emulation than to just being a translation layer.
- Think of it like Dolphin VS. Proton. Dolphin is a full emulator that virtualizes a console and then interprets system calls to the hardware. Proton is a compatibility layer that sits between the application and the hardware, adapting system calls to work for that system.
### Why is a Container so Much Faster Than a VM?
- as such, because a VM is re-creating an entire computer on a computer, it will always be much slower than something that is just "translating" calls from one form to the equivalent for the system.
### What Then Are the Limitations of a Container, and by Extension, Docker?
- these Containers and Docker cannot run a completely different system than what the actual system is. You cannot run Windows on Linux (easily) through Docker, and it is a hassle getting Docker to work on Windows without WSL to get Linux on there. 
- Docker is also not set up to be an entire OS. You could create an OS image for it that could do everything that an OS can do, but it would probably slow it down a lot. Docker is meant to be an easy set-up and tear-down working environment. It isn't meant to be consistently used like a VM.
- VMs might be slower, but they can get things working that a compatibility layer couldn't do otherwise, as they have more direct access to the hardware.
## IN SUMMARY
- A container is, in a sense, a compatibility layer or translation layer to make system calls for users and devs much easier to do and use.
- Docker extends this by creating environments with bundled packages needed for software to run. It makes its own little system, so users don't need to worry about finding and installing their own dependencies.
- These are all fast and light because they aren't doing any actual "VM" type things, as they all are just using already-known system calls.
- VMs are needed when the running system is very different to the base OS. Docker is best when the running system and base OS are generally the same.

There is a lot more to containers in general, especially the different kinds of containers, but this is good enough for me. I don't care exactly how the calls are being made or what they look like (as it is probably C or Rust and I have *very* little interest of diving into those languages again), but I got enough to know that Docker is not a VM and why it isn't a VM.

AKA I could write much more, but this is more than good enough to satisfy my curiosity.