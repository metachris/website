---
boldLinks: true
date: 2015-11-22T00:00:00Z
tags:
- Machine Learning
title: Machine Learning on Amazon AWS GPU Instances
url: /2015/11/machine-learning-on-amazon-aws-gpu-instances/
---

Machine learning algorithms regularly utilize GPUs to parallelize computations, and [Amazon AWS GPU Instances](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using_cluster_computing.html) provide cheap and on-demand access to capable virtual servers with NVIDIA GPUs.

[GPU Instances](http://aws.amazon.com/ec2/instance-types/#gpu) come in two flavors: <i>G2.2xlarge</i> and <i>G2.8xlarge</i>:

<table>
    <thead>
        <tr>
            <th>Model</th>
            <th>GPUs</th>
            <th>vCPU</th>
            <th>Mem (GiB)</th>
            <th>SSD Storage (GB)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>g2.2xlarge</th>
            <td>1</td>
            <td>8</td>
            <td>15</td>
            <td>1 x 60</td>
        </tr>
        <tr>
            <th>g2.8xlarge</th>
            <td>4</td>
            <td>32</td>
            <td>60</td>
            <td>2 x 120</td>
        </tr>
    </tbody>
</table>

The GPU instances feature [Intel Xeon E5-2670](http://www.bit-tech.net/hardware/cpus/2012/03/06/intel-xeon-e5-2670-review/1) (Sandy Bridge) Processors and NVIDIA GPUs with 1,536 CUDA cores and 4GB of video memory each.

---

<h2>Tips &amp; Tricks</h2>

Several machine learning frameworks such as [Torch](https://github.com/torch/torch7) and [Theano](http://deeplearning.net/software/theano/) as well as Amazon itself provide AMIs (Amazon Machine Images) with pre-installed dependencies and NVIDIA kernel drivers:

* [Torch AMI](https://github.com/torch/torch7/wiki/Cheatsheet#ec2-public-ami)
* [Theano AMI Howto](https://github.com/andreasjansson/simple-aws-gpu-setup)
* [Amazon AMIs](http://aws.amazon.com/marketplace/search/results/?searchTerms=NVIDIAGRID)

Use [spot instances](https://aws.amazon.com/ec2/spot/) - they're much cheaper for GPU instances!

* Pick a price that has been steady for a while
* $0.10/hr often gets you a g2.xlarge instance, even for a few days continuously
* You can view price graphs for the instance type in the [AWS console]( http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances-history.html).


Spot instances get a 2 minute notice before being shut down. You can use [boto](http://aws.amazon.com/sdk-for-python/) (AWS SDK for Python) to check the timestamp for when that will occur.

Make sure to snapshot your models, otherwise you might lose training time and have to start over. You can save the snapshots to S3 (depending on the size of the model).

Create an AMI with all dependencies pre-installed so you don't waste time installing those when the instance spins up.

For very large datasets use their [Elastic Block Storage (EBS)](https://aws.amazon.com/ebs/pricing/). It's basically an on-demand SSD you can attach to instances when they spin up.

---

<h2>References</h2>

* [Amazon AWS](http://aws.amazon.com)
  * [AWS GPU Instances Docs](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using_cluster_computing.html)
  * [AWS Instance Types](http://aws.amazon.com/ec2/instance-types/#gpu)
* [Torch](https://github.com/torch/torch7)
  * [Torch Public AMI](https://github.com/torch/torch7/wiki/Cheatsheet#ec2-public-ami)
  * [Torch Cheat Cheet](https://github.com/torch/torch7/wiki/Cheatsheet)
  * [Install Guide](https://github.com/brotchie/torch-ubuntu-gpu-ec2-install)
  * [Another Install Guide](http://blog.titocosta.com/post/110345699197/public-ec2-ami-with-torch-and-caffe-deep-learning)

* [Theano](http://deeplearning.net/software/theano)
  * [Setup Guide](https://github.com/andreasjansson/simple-aws-gpu-setup)
  * [Another Setup Guide](http://markus.com/install-theano-on-aws/)
  * [Install on Ubuntu Docs](http://deeplearning.net/software/theano/install_ubuntu.html#install-ubuntu)

* [TensorFlow](http://www.tensorflow.org/)
  * [Guide for AWS](https://gist.github.com/Hello1024/bfbcb4616aadee62c68e)

<hr class="spaced">

If you have suggestions, feedback or ideas, reach out to <a href="https://twitter.com/metachris" target="_blank">@metachris</a>!
