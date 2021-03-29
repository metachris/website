---
title: KubeCon Europe 2017 Impressions
date: 2017-04-07T22:00:00Z
description: Impressions of the KubeCon / CloudNativeCon 2017 in Berlin
image: images/posts/kubecon/pic1v2.jpg
thumbnail: images/logos/kubecon.jpg
tags: 
- Kubernetes
---

{{< load-photoswipe >}}

Last week I was visiting **CloudNativeCon and KubeCon Europe 2017** in Berlin for two days of conference packed with talks. The conference took place in the good ol' [Berlin Congress Center](http://www.bcc-berlin.de/), which brought up good memory on the earlier Chaos Computer Congresses, which used to take place there. This post is a quick recap of my notes and impressions.

{{< figure link="/images/posts/kubecon/pic1v2.jpg" caption="KubeCon 2017 Keynote" >}}

<hr class="spaced">

# Cloud Native Computing Foundation

<img src="/images/logos/cncf-box.png" style="float:right; max-width:60px; margin-left:20px; margin-top:4px;" alt="CNCF Logo" title="CNCF Logo" />
The conference was organized by the [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/), "a nonprofit organization committed to advancing the development of cloud native technology and services", and a daughter organization of the Linux Foundation. The primary mission of CNCF is to incubate and promote projects, and to support standardization of emerging technologies (eg. container).

The CNCF currently [hosts 10 projects](https://www.cncf.io/projects/): 

* [Kubernetes](https://github.com/kubernetes)
* [Prometheus](https://github.com/prometheus)
* [OpenTracing](https://github.com/opentracing)
* [Fluentd](https://github.com/fluent/fluentd/)
* [Linkerd](https://github.com/linkerd/linkerd)
* [gRPC](https://github.com/grpc)
* [CoreDNS](https://github.com/coredns/coredns)
* [containerd](https://github.com/docker/containerd)
* [rkt](https://github.com/coreos/rkt)

<hr class="spaced">

The following picture illustrates the current "[Cloud Native Landscape](https://github.com/cncf/landscape)", a landscape of the currently most important projects regarding cloud-native applications and architectures:

{{< figure link="/images/posts/kubecon/CloudNativeLandscape_v0.9.3.jpg" caption="Cloud Native Landscape" >}}

<hr class="spaced">

**Quote of the day**

> We replaced our monolith with micro services so that every outage could be more like a murder mystery.<br>[@honest_update](https://twitter.com/honest_update/status/651897353889259520?lang=de)

<hr class="spaced">

# Kubernetes (k8s)

<img src="/images/logos/kubernetes.png" style="float:right; max-width:120px; margin-left:20px; margin-top:4px;" alt="Kuberneters Logo" title="Kubernetes Logo" />

[kubernetes.io](https://kubernetes.io/), [github.com/kubernetes](https://github.com/kubernetes)

> Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.

* It is one of the largest and most active open-source projects.
* Google uses vanilla Kubernetes, on top of it's Borg system.
* RedHat is a major contributor, building it's [OpenShift](https://www.openshift.com/) platform on top of Kubernetes.
* [Kubernetes Community](https://github.com/kubernetes/community/blob/master/README.md#slack-chat)
  * More than 1,500 contributors, 22k GitHub stars.
  * Project governance is distributed in special interest groups (SIGs), which meet weekly or bi-weekly with video conferences.
  * Primary communication channel seems to be Slack, then mailing lists.
* Release and Security Management
  * Release cycle is about 3 months.
  * Each release has a dedicated release manager and is supported for 9 to 12 months. 
  * Upon security disclosures, a patch version will be released within 21 days.
* Extremely active development, lots of progress on all sides.

{{< figure link="/images/posts/kubecon/pic2.jpg" caption="Special Interest Groups" >}}

<hr class="spaced">

# The Conference

* The event was completely sold out, with about 1500 attendees.
* It was very crowded in both the conference center in general, as well as in the rooms. For many interesting talks the rooms couldn't hold enough people and were simply overflowing.
* There were always 8 tracks in parallel.
* Pickling talks was kind of a lottery. It was impossible to tell by just the description whether the talk would be just a high level product demo, or in-depth technical knowledge with lessions learned and best practices.
* Google, CoreOS, RedHat and Weaveworks were very present. Docker was hardly present.
* Food was very good and plenty. Always snacks, drinks, coffee and a proper lunch.
* After-party on the first day was rather boring, with fancy snacks but boring music, only sugared drinks (sugared beer and sugared cider), and uninspiring games such as connect 4. 
* After-party on the second day was good, with the majority of conference attendees going, great food and good drinks, music, table soccer and a lot of space in a great location.
* Overall it was a good conference, and I would go there again!

<hr class="spaced">

{{< gallery >}}
{{< figure link="/images/posts/kubecon/g1/conf-logos.jpg" caption="Keynote Room" >}}
{{< figure link="/images/posts/kubecon/g1/room-superfull.jpg" caption="Full Room" >}}
{{< figure link="/images/posts/kubecon/g1/slide-things-are-more-complex.jpg" caption="Slide: Things Are More Complex" >}}
{{< figure link="/images/posts/kubecon/g1/tablesoccer.jpg" caption="Big Table Soccer" >}}
{{< figure link="/images/posts/kubecon/g1/werk-inside.jpg" caption="Inside the Werk Club" >}}
{{< figure link="/images/posts/kubecon/g1/pasta.jpg" caption="Pasta at the Werk Club" >}}
{{< /gallery >}}

<hr class="spaced">


# Talks on YouTube

All conference talks are [up on YouTube](https://www.youtube.com/playlist?list=PLj6h78yzYM2PAavlbv0iZkod4IVh_iGqV), check them out if you are interested!
