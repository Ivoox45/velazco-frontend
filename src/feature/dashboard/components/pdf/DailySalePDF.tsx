import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { DailySaleResponseDto, ProductSold } from "../../types";

// Agrupa productos iguales
function groupProducts(products: ProductSold[]) {
  const map = new Map<string, ProductSold>();
  products.forEach((p) => {
    if (!map.has(p.productName)) {
      map.set(p.productName, { ...p });
    } else {
      const old = map.get(p.productName)!;
      old.quantitySold += p.quantitySold;
      old.subtotal += p.subtotal;
    }
  });
  return Array.from(map.values());
}

const colorMain = "#B31368";
const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 12, backgroundColor: "#fff" },
  headerSection: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  logo: { width: 90, height: 46, marginRight: 22, objectFit: "contain" },
  titleBox: { flexDirection: "column" },
  reportTitle: { fontSize: 23, fontWeight: 900, color: colorMain },
  subtitle: { fontSize: 11, color: "#333", marginTop: 2 },
  dateSection: { marginBottom: 12, fontSize: 13, color: "#333" },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colorMain,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 28,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: colorMain,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    borderBottomWidth: 2,
    borderBottomColor: colorMain,
    borderStyle: "solid",
  },
  tableCell: {
    width: "25%",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    borderStyle: "solid",
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  tableCellLast: { borderRightWidth: 0 },
  tableCellBody: { backgroundColor: "#fff", color: "#111", fontSize: 12 },
  zebraRow: { backgroundColor: "#faf6fb" },
  summaryBox: { marginTop: 8, fontSize: 12, color: "#222", flexDirection: "row", gap: 14 },
  summaryText: { fontWeight: "bold", color: colorMain, fontSize: 13 },
  footer: {
    marginTop: 24,
    textAlign: "center",
    color: "#bbb",
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
    letterSpacing: 0.2,
  },
  watermark: {
    position: "absolute",
    top: "45%",
    left: "25%",
    width: 250,
    height: 90,
    opacity: 0.08,
    zIndex: 0,
  },
});

export function DailySalePDF({ sale }: { sale: DailySaleResponseDto }) {
  const groupedProducts = groupProducts(sale.products);

  const now = new Date();
  const fechaGen = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <Document>
      <Page style={styles.page} wrap>
        {/* Marca de agua (opcional) */}
        {/* <Image src="/logo.png" style={styles.watermark} /> */}

        {/* Header */}
        <View style={styles.headerSection}>
          <Image src="/logo.png" style={styles.logo} />
          <View style={styles.titleBox}>
            <Text style={styles.reportTitle}>Reporte de Ventas del Día</Text>
            <Text style={styles.subtitle}>Velazco - Intranet</Text>
          </View>
        </View>
        <View style={styles.dateSection}>
          <Text>Fecha del reporte: {sale.date}</Text>
          <Text>
            Total Vendido: <Text style={{ fontWeight: "bold", color: colorMain }}>S/. {sale.totalSales.toFixed(2)}</Text>
          </Text>
        </View>
        {/* Tabla */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Producto</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Cantidad</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Precio Unitario</Text>
            <Text style={[styles.tableCell, styles.tableHeader, styles.tableCellLast]}>Subtotal</Text>
          </View>
          {groupedProducts.map((prod, idx) => (
            <View
              key={idx}
              style={[
                styles.tableRow,
                idx % 2 === 1 && styles.zebraRow,
              ]}
            >
              <Text style={[styles.tableCell, styles.tableCellBody]}>{prod.productName}</Text>
              <Text style={[styles.tableCell, styles.tableCellBody]}>{prod.quantitySold}</Text>
              <Text style={[styles.tableCell, styles.tableCellBody]}>S/. {prod.unitPrice.toFixed(2)}</Text>
              <Text style={[styles.tableCell, styles.tableCellBody, styles.tableCellLast]}>S/. {prod.subtotal.toFixed(2)}</Text>
            </View>
          ))}
        </View>
        {/* Resumen final */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            Total productos vendidos: {groupedProducts.reduce((a, p) => a + p.quantitySold, 0)}
          </Text>
          <Text style={styles.summaryText}>
            Productos distintos: {groupedProducts.length}
          </Text>
        </View>
        {/* Footer */}
        <Text style={styles.footer}>
          Reporte generado automáticamente por el Sistema. {fechaGen}
        </Text>
      </Page>
    </Document>
  );
}
