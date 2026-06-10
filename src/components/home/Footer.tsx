import { LogoIcon } from '../../assets/illustrations/LogoIcon';

export function Footer() {
  return (
    <footer className="bg-leaf-800 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <LogoIcon size={36} />
              <div>
                <div className="font-title text-base font-bold text-white leading-tight">AI叶子训练师</div>
                <div className="text-xs text-white/40 leading-tight">倍好玩俱乐部</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              教AI认识农场里的叶子。<br />
              一个面向小学研学活动的AI教学体验。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-title text-white font-semibold text-sm mb-4">探索</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-leaf-300 transition-colors">如何玩</a></li>
              <li><a href="#" className="hover:text-leaf-300 transition-colors">叶子图鉴</a></li>
              <li><a href="#" className="hover:text-leaf-300 transition-colors">活动流程</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-title text-white font-semibold text-sm mb-4">支持</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-leaf-300 transition-colors">家长指南</a></li>
              <li><a href="#" className="hover:text-leaf-300 transition-colors">老师手册</a></li>
              <li><a href="#" className="hover:text-leaf-300 transition-colors">常见问题</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-title text-white font-semibold text-sm mb-4">关于</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-leaf-300 transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-leaf-300 transition-colors">隐私政策</a></li>
              <li><a href="#" className="hover:text-leaf-300 transition-colors">使用条款</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LogoIcon size={20} />
              <p className="text-xs text-white/40">
                &copy; {new Date().getFullYear()} AI叶子训练师 &middot; 倍好玩俱乐部
              </p>
            </div>
            <p className="text-xs text-white/30 text-center sm:text-right max-w-md">
              现场叶子照片默认保存在本设备浏览器中，不上传服务器。活动结束后可一键清除数据。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
