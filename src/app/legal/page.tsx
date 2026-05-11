import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function LegalPage() {
  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">법적 고지</p>
        <h1 className="mt-1 text-3xl font-black text-ink">배포 전 지켜야 할 원칙</h1>
      </header>

      <section className="mt-5 space-y-3 rounded-3xl bg-white p-5 shadow-soft">
        <Notice title="투자자문 아님" body="센스폴리오(Sensefolio)의 모든 문장은 교육과 참고용 해석입니다. 특정 종목의 매수, 매도, 보유를 확정적으로 권유하지 않습니다." />
        <Notice title="저작권 보호" body="기사 본문, 유료 리포트, 이미지, 로고, 차트 화면을 무단 복제하지 않습니다. 외부 콘텐츠는 제목, 출처, 링크와 자체 요약만 표시하는 방식을 기본으로 합니다." />
        <Notice title="데이터 출처" body="서비스에서는 사용 권한이 있는 시세 API, 뉴스 API, 공시 API만 연결해야 합니다. 크롤링이 금지된 사이트의 본문을 저장하거나 재배포하지 않습니다." />
        <Notice title="AI 요약" body="AI 요약은 원문 대체물이 아니라 사용자가 출처를 이해하기 쉽게 돕는 보조 설명입니다. 중요한 판단은 반드시 원문 공시와 공식 자료를 확인해야 합니다." />
      </section>

      <Link href="/" className="mt-5 block h-12 rounded-2xl bg-ink pt-3 text-center text-sm font-black text-white">홈으로 돌아가기</Link>
      <Link href="/privacy" className="mt-3 block h-12 rounded-2xl bg-black/[0.06] pt-3 text-center text-sm font-black text-black/65">개인정보 저장 방식 보기</Link>
    </AppShell>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl bg-paper p-4">
      <h2 className="text-base font-black">{title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-black/62">{body}</p>
    </article>
  );
}
