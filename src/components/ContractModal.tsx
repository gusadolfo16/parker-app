'use client';

import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import { useAppText } from '@/i18n/state/client';
import SubmitButtonWithStatus from './SubmitButtonWithStatus';
import { clsx } from 'clsx/lite';

export default function ContractModal({
    artistName,
    onSign,
}: {
    artistName: string
    onSign: () => Promise<void>
}) {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const appText = useAppText();

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            // Use a small buffer for rounding errors
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                setHasScrolledToBottom(true);
            }
        }
    };

    useEffect(() => {
        // Check if content is small enough that it doesn't need scrolling
        if (scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            if (scrollHeight <= clientHeight) {
                setHasScrolledToBottom(true);
            }
        }
    }, []);

    const handleSign = async () => {
        setIsSigning(true);
        await onSign();
        setIsSigning(false);
    };

    return (
        <Modal
            anchor="center"
            container={true}
            className="max-h-[80vh] flex flex-col"
            noPadding
        >
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold">{appText.admin.contract.title}</h2>
            </div>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-grow overflow-y-auto p-6 space-y-4 text-sm leading-relaxed text-dim scrollbar-thin"
            >
                <p className="font-bold text-center uppercase tracking-wider">
                    {appText.admin.contract.modelTitle}
                </p>
                <p className="font-bold text-center uppercase">
                    {appText.admin.contract.agreementTitle}
                </p>

                <p>
                    {appText.admin.contract.between.replace('{{artistName}}', artistName)}
                </p>

                <div className="space-y-4">
                    <p>
                        <span className="font-bold">1. OBJETO:</span> El ARTISTA realiza una intervención artística (dibujo, pintura, escritura u otra técnica) sobre una fotografía original del EDITOR titulada &quot;[Nombre de la Foto]&quot;. La unión de ambas se denominará en adelante la OBRA FINAL.
                    </p>
                    <p>
                        <span className="font-bold">2. CESIÓN DE DERECHOS:</span> El ARTISTA cede al EDITOR de manera exclusiva, total y perpetua, los derechos de reproducción, distribución, venta y comunicación pública sobre su intervención incluida en la OBRA FINAL. Esta cesión habilita al EDITOR a comercializar la obra dentro del proyecto del fotolibro actualmente titulado &quot;Polifonía Visual&quot; y cualquier material derivado o promocional.
                    </p>
                    <p>
                        <span className="font-bold">3. CARÁCTER DE LA CESIÓN Y GANANCIAS:</span> Las partes acuerdan que la presente cesión se realiza a título gratuito. El ARTISTA acepta que el 100% de los ingresos generados por la venta del fotolibro y productos derivados pertenecerán exclusivamente al EDITOR. El ARTISTA renuncia expresamente a reclamar regalías, porcentajes o cualquier otra contraprestación económica presente o futura.
                    </p>
                    <p>
                        <span className="font-bold">4. RECONOCIMIENTO DE AUTORÍA (DERECHOS MORALES):</span> El EDITOR se obliga a mencionar la autoría del ARTISTA en cada reproducción de la obra dentro del libro y en créditos generales, respetando la fórmula: &quot;Fotografía: Gustavo Sanchez / Intervención: {artistName}&quot;.
                    </p>
                    <p>
                        <span className="font-bold">5. LEY APLICABLE:</span> El presente se rige por la Ley 11.723 de Propiedad Intelectual de la República Argentina. Cualquier controversia será sometida a los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires.
                    </p>
                </div>

                <p className="pt-4 italic">
                    Firmado electrónicamente por {artistName} en Buenos Aires, el {new Date().toLocaleDateString()}.
                </p>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                {!hasScrolledToBottom && (
                    <p className="text-xs text-red-500 text-center animate-pulse">
                        {appText.admin.contract.mustScrollToBottom}
                    </p>
                )}
                <button
                    onClick={handleSign}
                    disabled={!hasScrolledToBottom || isSigning}
                    className={clsx(
                        'w-full py-3 rounded-lg font-bold transition-colors',
                        hasScrolledToBottom && !isSigning
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
                    )}
                >
                    {isSigning ? appText.admin.contract.signing : appText.admin.contract.sign}
                </button>
            </div>
        </Modal>
    );
}
