import express from 'express';
import cors from 'cors';
import ExcelJS from 'exceljs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend R3 Pro Evolution rodando com sucesso!' });
});

app.post('/generate-excel', async (req, res) => {
  try {
    const { title, data } = req.body;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(title || 'Relatório');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Descrição', key: 'description', width: 30 },
      { header: 'Quantidade', key: 'quantity', width: 15 },
      { header: 'Valor (R$)', key: 'value', width: 15 },
    ];

    worksheet.getRow(1).font = { bold: true };

    if (Array.isArray(data)) {
      data.forEach((item) => {
        worksheet.addRow(item);
      });
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Erro ao gerar Excel:', error);
    res.status(500).json({ error: 'Erro interno ao gerar o arquivo Excel.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
