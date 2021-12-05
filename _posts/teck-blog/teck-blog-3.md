---
title: どのようにしてインターネットは働いているのか
slug: teck-blog-3
tag: ['TCP/IP', 'Internet', 'frontend loadmap']
image: study.png
created_at: 2021-12-02T23:11:36
description: Frontend loadmapをみて推奨されているものについての勉強
---

# インターネットはどのように機能するのか

TCPとIPが連携して、使用しているデバイスや使用している場所に関係なく、インターネットを介したデータ転送の一貫性と信頼性を確保する。

データがインターネット系経由で転送される場合、データはメッセージとパケットで配信される。

インターネットを介して送信されるデータはメッセージと呼ばれるが、メッセージが送信される前に、パケットと呼ばれるものに分割される


これらのメッセージとパケットは、Internet Protcol(IP)とTransmission Control Protcol(TCP)を使用して、あるソースから次のソースに移動する。

IPはインターネット接続を介して指定したIPアドレスを送り先として、パケット単位でデータをやり取りして通信する

TCPはIPと連携して、データの転送を信頼性を確保する。
これにより、パケットが失われたり、データ品質に悪影響を与える遅延が発生したりすることがなくなる。

# パケットとは

TCP/IPネットワークで通信を行う際、データはIPによって分割される。
この分割されたデータのことをパケットと呼ぶ

# 参考

https://www.hp.com/us-en/shop/tech-takes/how-does-the-internet-work#:~:text=It%20works%20by%20using%20a,where%20you're%20using%20it.

