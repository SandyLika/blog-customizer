import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export interface IAllOptions {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

const App = () => {
	//const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [artState, setArtState] = useState<IAllOptions>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': artState.fontFamilyOption.value,
					'--font-size': artState.fontSizeOption.value,
					'--font-color': artState.fontColor.value,
					'--container-width': artState.contentWidth.value,
					'--bg-color': artState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm saveFormData={setArtState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
