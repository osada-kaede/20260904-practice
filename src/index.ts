import express, { Request, Response } from 'express';
import path from 'path';
import todoRoutes from './routes/todoRoutes'; // ① インポートを追加！

const app = express();
const port: number = 3000;

// 設定
app.use(express.urlencoded({ extended: true })); // フォームデータの受信設定
app.use(express.json()); // JSONデータの受信設定（これがないとAPIが動かない）
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイルの指定

app.set('view engine', 'ejs'); // テンプレートエンジンにEJSを設定
app.set('views', path.join(__dirname, 'views')); // ビューのディレクトリを設定

// ルーティング登録 (/todos パス配下に集約)
app.use('/todos', todoRoutes);

// ルートパスへのアクセスを /todos にリダイレクト（一本化する）
app.get('/', (req: Request, res: Response) => {
    res.redirect('/todos');
});

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`);
});