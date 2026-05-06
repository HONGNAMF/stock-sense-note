import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <header>
        <p className="text-sm font-bold text-black/50">개인정보 안내</p>
        <h1 className="mt-1 text-3xl font-black text-ink">현재 MVP의 저장 방식</h1>
      </header>

      <section className="mt-5 space-y-3 rounded-3xl bg-white p-5 shadow-soft">
        <Notice
          title="브라우저 저장"
          body="현재 버전은 로그인 계정 없이 localStorage에 정보를 저장합니다. 이름, 생년월일, 관심사, 관심종목, 판단 기록, 매수/매도 기록은 사용 중인 기기에만 저장됩니다."
        />
        <Notice
          title="다른 기기 동기화 없음"
          body="휴대폰과 PC는 서로 다른 저장소를 사용합니다. 같은 주소로 접속해도 입력한 기록이 자동으로 이어지지 않을 수 있습니다."
        />
        <Notice
          title="민감정보 최소화"
          body="이 앱은 주민등록번호, 계좌번호, 비밀번호, 실제 거래 인증 정보를 입력받지 않습니다. 배포 후에도 이런 정보는 입력받지 않는 구조를 권장합니다."
        />
        <Notice
          title="추후 전환"
          body="로그인 기능을 붙일 때는 local_user_id 기반 데이터를 실제 user_id로 마이그레이션할 수 있도록 services 계층에서 저장소를 교체합니다."
        />
      </section>

      <Link href="/" className="mt-5 block h-12 rounded-2xl bg-ink pt-3 text-center text-sm font-black text-white">
        홈으로 돌아가기
      </Link>
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
