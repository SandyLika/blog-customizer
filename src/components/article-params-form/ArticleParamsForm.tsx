import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import { useState, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	saveFormData: (settings: typeof defaultArticleState) => void;
};
export const ArticleParamsForm = ({ saveFormData }: ArticleParamsFormProps) => {
	const [artState, setArtState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		saveFormData(artState);
	};

	function setDefault() {
		setArtState(defaultArticleState);
		saveFormData(defaultArticleState);
	}

	const handleFontFamilyChange = (
		option: (typeof fontFamilyOptions)[number]
	) => {
		setArtState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setArtState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[number]
	) => {
		setArtState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (
		option: (typeof contentWidthArr)[number]
	) => {
		setArtState((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		setArtState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const ref = useRef<HTMLDivElement>(null);

	// Обработчик клика вне панели кастомизаци
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: ref,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<div ref={ref}>
				<ArrowButton
					isOpen={isMenuOpen}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				/>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='шрифт'
							selected={artState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>
						<RadioGroup
							name='fontSize'
							title='размер шрифта'
							selected={artState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleFontSizeChange}
						/>
						<Select
							title='цвет шрифта'
							selected={artState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
						/>
						<Separator />
						<Select
							title='цвет фона'
							selected={artState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
						/>
						<Select
							title='ширина контента'
							selected={artState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={setDefault}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
