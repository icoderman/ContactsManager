package contacts.manager.config.root;

import javax.persistence.EntityManagerFactory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

/**
 *
 * The root context configuration of the application - the beans in this context will be globally visible
 * in all servlet contexts.
 *
 */

@Configuration
@EnableJpaRepositories("contacts.manager.app.dao")
@ComponentScan({"contacts.manager.app.services","contacts.manager.app.model", "contacts.manager.app.dao", "contacts.manager.app.security"})
public class RootContextConfig {

	@Bean(name = "transactionManager")
	public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory,
	                                                     DriverManagerDataSource dataSource) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory);
		transactionManager.setDataSource(dataSource);
		return transactionManager;
	}

}
