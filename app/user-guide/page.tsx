'use client';

import AppGrid from '@/components/AppGrid';
import { useAppText } from '@/i18n/state/client';

const BUTTON_LABEL_CLASS = 'font-bold text-gray-400 w-28 shrink-0 uppercase text-xs pt-1';

export default function UserGuidePage() {
    const t = useAppText();
    const g = t.userGuide;

    const steps = [
        { title: g.step1Title, description: g.step1Desc },
        { title: g.step2Title, description: g.step2Desc },
        { title: g.step3Title, description: g.step3Desc },
        { title: g.step4Title, description: g.step4Desc },
        { title: g.step5Title, description: g.step5Desc },
    ];

    const buttons = [
        { label: 'Select', desc: g.btnSelect },
        { label: 'View', desc: g.btnView },
        { label: 'Confirm', desc: g.btnConfirm },
        { label: 'Cancel', desc: g.btnCancel },
        { label: 'Enviar / Send', desc: g.btnSendEmail },
        { label: 'Limpiar / Clear', desc: g.btnClearUnlock },
    ];

    return (
        <AppGrid
            contentMain={
                <div className="space-y-8 max-w-3xl mx-auto py-4">
                    <section className="space-y-4">
                        <h1 className="text-3xl font-bold">{g.title}</h1>
                        <p className="text-lg text-dim leading-relaxed">
                            {g.intro}
                        </p>
                    </section>

                    <div className="grid gap-6 md:grid-cols-2">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 space-y-3"
                            >
                                <h2 className="text-xl font-bold text-blue-500">{step.title}</h2>
                                <p className="text-dim leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <section className="p-8 rounded-xl bg-gray-50 dark:bg-gray-900/50 space-y-4 border border-blue-100 dark:border-blue-900/30">
                        <h2 className="text-2xl font-bold">{g.buttonsTitle}</h2>
                        <ul className="space-y-4">
                            {buttons.map(({ label, desc }) => (
                                <li key={label} className="flex gap-4">
                                    <span className={BUTTON_LABEL_CLASS}>{label}</span>
                                    <p className="text-dim">{desc}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            }
        />
    );
}
