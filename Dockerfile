# Sử dụng Node.js làm base image
FROM node:20

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy toàn bộ mã nguồn vào container
COPY . .

# Cài đặt dependencies
RUN npm install

# Build ứng dụng Vite (production)
RUN npm run build

# Mở cổng mặc định vite preview
EXPOSE 4173

# Chạy vite preview khi container start
CMD ["npm", "run", "preview", "--", "--host"]
