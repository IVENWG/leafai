import './PageShell.css';

interface PageShellProps {
  children: React.ReactNode;
  showPrivacy?: boolean;
}

export function PageShell({ children, showPrivacy = true }: PageShellProps) {
  return (
    <div className="page-shell">
      {/* Decorative elements */}
      <div className="deco-clouds">
        <div className="deco-cloud deco-cloud-1">☁️</div>
        <div className="deco-cloud deco-cloud-2">☁️</div>
        <div className="deco-cloud deco-cloud-3">⛅</div>
      </div>
      <div className="deco-grass" />

      <main className="page-content">
        {children}
      </main>

      {showPrivacy && (
        <footer className="page-footer">
          <p>🔒 本活动中的叶子照片仅用于现场AI训练演示。所有数据保存在本设备浏览器中，不上传服务器。活动结束后，老师可一键清除本场训练数据。</p>
        </footer>
      )}
    </div>
  );
}
