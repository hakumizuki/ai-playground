FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Python 3.13をインストール
RUN apt-get update && apt-get install -y \
    wget \
    build-essential \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    libsqlite3-dev \
    libbz2-dev \
    && rm -rf /var/lib/apt/lists/*

# Python 3.13をソースからビルド
RUN cd /tmp && \
    wget https://www.python.org/ftp/python/3.13.0/Python-3.13.0.tgz && \
    tar -xzf Python-3.13.0.tgz && \
    cd Python-3.13.0 && \
    ./configure --enable-optimizations --prefix=/usr/local && \
    make -j$(nproc) && \
    make altinstall && \
    cd / && \
    rm -rf /tmp/Python-3.13.0*

# Python 3.13をデフォルトに設定
RUN update-alternatives --install /usr/bin/python3 python3 /usr/local/bin/python3.13 1
RUN update-alternatives --install /usr/bin/python python /usr/local/bin/python3.13 1
RUN update-alternatives --install /usr/bin/pip3 pip3 /usr/local/bin/pip3.13 1

# pipを最新版にアップデート
RUN python3.13 -m pip install --upgrade pip

# グローバルにTypeScriptとViteをインストール
RUN npm install -g typescript @types/node vite @vitejs/plugin-react

# 作業ディレクトリを設定
WORKDIR /workspace

# ユーザー権限を設定
RUN chown -R node:node /workspace
USER node

# コンテナ起動時のコマンド
CMD ["sleep", "infinity"] 